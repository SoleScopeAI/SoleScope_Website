@@ .. @@
                     <button
                       onClick={() => toggleFaq(index)}
                       className="w-full px-8 py-6 text-left flex justify-between items-start hover:bg-gray-700/20 transition-all duration-300 focus:outline-none focus:bg-gray-700/20"
+                      onKeyDown={(e) => {
+                        if (e.key === 'Enter' || e.key === ' ') {
+                          e.preventDefault();
+                          toggleFaq(index);
+                        }
+                      }}
                       aria-expanded={activeIndex === index}
+                      aria-controls={`faq-answer-${index}`}
                     >
                       <div className="flex-1 pr-6">
-                        <h3 className="text-xl font-semibold dark-text-primary mb-2 group-hover:text-accent-primary transition-colors uppercase tracking-wide">
+                        <h3 className="text-xl font-semibold dark-text-primary mb-2 group-hover:text-accent-primary transition-colors uppercase tracking-wide" id={`faq-question-${index}`}>
                           {faq.question}
                         </h3>
                         <div className="flex flex-wrap gap-2">
@@ .. @@
                           transition={{ duration: 0.3, ease: "easeInOut" }}
                           className="overflow-hidden"
                         >
-                          <div className="px-8 pb-6">
+                          <div className="px-8 pb-6" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}>
                             <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                             <p className="dark-text-body leading-relaxed text-lg font-normal">
                               {faq.answer}</p>