class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: linear-gradient(to right, #0f172a, #1e293b);
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                }
                
                .footer-link {
                    position: relative;
                }
                
                .footer-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background-color: white;
                    transition: width 0.3s ease;
                }
                
                .footer-link:hover::after {
                    width: 100%;
                }
                
                .social-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .social-icon:hover {
                    transform: translateY(-3px);
                }
            </style>
            
            <footer class="py-12 px-6">
                <div class="container mx-auto">
                    <div class="border-t border-white/10 pt-8 text-center">
                        <p class="text-gray-400 text-sm mb-2">&copy; ${new Date().getFullYear()} AzhanFizz. All rights reserved.</p>
                        <p class="text-gray-500 text-xs">Designed & Developed with <span class="text-red-500">❤</span> by Azhan</p>
                    </div>
                </div>
            </footer>
        `;
        
        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
}

customElements.define('custom-footer', CustomFooter);