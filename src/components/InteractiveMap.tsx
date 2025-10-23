import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Navigation, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = [-0.213, 51.761],
  zoom = 6.5,
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const initialView = useRef({ center, zoom });
  const interactionTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'osm-tiles-layer',
              type: 'raster',
              source: 'osm-tiles',
              minzoom: 0,
              maxzoom: 19
            }
          ],
          glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf'
        },
        center: center,
        zoom: zoom,
        minZoom: 4,
        maxZoom: 12,
        scrollZoom: false,
        attributionControl: false
      });

      map.current.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution: '© OpenStreetMap contributors'
        }),
        'bottom-right'
      );

      map.current.on('load', () => {
        setMapLoaded(true);

        // Interaction state management
        const startInteraction = () => {
          if (interactionTimeout.current) {
            clearTimeout(interactionTimeout.current);
          }
          setIsInteracting(true);
        };

        const endInteraction = () => {
          if (interactionTimeout.current) {
            clearTimeout(interactionTimeout.current);
          }
          interactionTimeout.current = setTimeout(() => {
            setIsInteracting(false);
          }, 400);
        };

        // Map interaction events
        map.current!.on('zoomstart', startInteraction);
        map.current!.on('zoomend', endInteraction);
        map.current!.on('dragstart', startInteraction);
        map.current!.on('dragend', endInteraction);
        map.current!.on('pitchstart', startInteraction);
        map.current!.on('pitchend', endInteraction);
        map.current!.on('rotatestart', startInteraction);
        map.current!.on('rotateend', endInteraction);

        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <div class="marker-wrapper">
            <div class="marker-pulse"></div>
            <div class="marker-pin">
              <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 16 42 16 42C16 42 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" fill="#6C3EF0"/>
                <circle cx="16" cy="15" r="6" fill="white"/>
              </svg>
            </div>
          </div>
        `;

        marker.current = new maplibregl.Marker({
          element: markerElement,
          anchor: 'bottom'
        })
          .setLngLat(center)
          .setPopup(
            new maplibregl.Popup({
              offset: 25,
              closeButton: false,
              className: 'map-popup'
            })
            .setHTML('<div class="map-popup-content"><strong>Head Office</strong><br/>Hatfield, Hertfordshire</div>')
          )
          .addTo(map.current!);

        markerElement.addEventListener('mouseenter', () => {
          if (marker.current) {
            marker.current.togglePopup();
          }
        });

        markerElement.addEventListener('mouseleave', () => {
          if (marker.current && marker.current.getPopup().isOpen()) {
            marker.current.togglePopup();
          }
        });
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError(true);
      });

      map.current.on('wheel', (e) => {
        if (!e.originalEvent.ctrlKey && !e.originalEvent.metaKey) {
          e.preventDefault();
          return false;
        }
      });

      const handleKeydown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && map.current) {
          map.current.scrollZoom.enable();
        }
      };

      const handleKeyup = (e: KeyboardEvent) => {
        if (!(e.ctrlKey || e.metaKey) && map.current) {
          map.current.scrollZoom.disable();
        }
      };

      window.addEventListener('keydown', handleKeydown);
      window.addEventListener('keyup', handleKeyup);

      return () => {
        window.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('keyup', handleKeyup);
        if (interactionTimeout.current) {
          clearTimeout(interactionTimeout.current);
        }
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Failed to initialize map:', error);
      setMapError(true);
    }
  }, []);

  const startInteractionManual = () => {
    if (interactionTimeout.current) {
      clearTimeout(interactionTimeout.current);
    }
    setIsInteracting(true);
  };

  const endInteractionManual = () => {
    if (interactionTimeout.current) {
      clearTimeout(interactionTimeout.current);
    }
    interactionTimeout.current = setTimeout(() => {
      setIsInteracting(false);
    }, 400);
  };

  const resetView = () => {
    if (map.current) {
      startInteractionManual();
      map.current.flyTo({
        center: initialView.current.center,
        zoom: initialView.current.zoom,
        duration: 1000
      });
      setTimeout(endInteractionManual, 1000);
    }
  };

  const zoomIn = () => {
    if (map.current) {
      startInteractionManual();
      map.current.zoomIn();
      setTimeout(endInteractionManual, 300);
    }
  };

  const zoomOut = () => {
    if (map.current) {
      startInteractionManual();
      map.current.zoomOut();
      setTimeout(endInteractionManual, 300);
    }
  };

  if (mapError) {
    return (
      <div className={`map-fallback ${className}`}>
        <div className="map-fallback-content">
          <MapPin className="h-16 w-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Head Office Location</h3>
          <p className="text-white/80 mb-1">Hatfield, Hertfordshire</p>
          <p className="text-white/60 text-sm mb-4">United Kingdom</p>
          <a
            href="https://www.google.com/maps/place/Hatfield,+UK/@51.761,-0.213,12z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <svg className="map-fallback-svg" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="600" fill="#0F0E15"/>
          <path
            d="M 400 50 L 450 100 L 500 90 L 520 120 L 580 150 L 600 200 L 580 250 L 550 280 L 500 300 L 450 320 L 400 350 L 350 320 L 300 300 L 250 280 L 220 250 L 200 200 L 220 150 L 280 120 L 300 90 L 350 100 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.3"
          />
          <circle cx="400" cy="180" r="8" fill="#6C3EF0"/>
          <text x="420" y="185" fill="#ffffff" fontSize="14" opacity="0.8">Hatfield</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`map-container ${isInteracting ? 'is-interacting' : ''} ${className}`}>
      <div
        ref={mapContainer}
        className="map-viewport"
        role="region"
        aria-label="Interactive map showing Head Office location in Hatfield"
      />

      <div className="map-controls" role="toolbar" aria-label="Map controls">
        <button
          onClick={zoomIn}
          className="map-control-btn"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={zoomOut}
          className="map-control-btn"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={resetView}
          className="map-control-btn"
          aria-label="Reset view"
          title="Reset to default view"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {!mapLoaded && (
        <div className="map-loading">
          <div className="map-loading-spinner"></div>
          <p className="text-white/80 mt-4">Loading map...</p>
        </div>
      )}

      <div className="map-hint">
        <Navigation className="h-3 w-3" />
        <span>Hold Ctrl/Cmd to zoom with scroll wheel</span>
      </div>
    </div>
  );
};

export default InteractiveMap;
