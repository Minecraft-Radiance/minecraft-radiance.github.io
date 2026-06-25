function renderFooter() {
    const footerHost = document.getElementById('site-footer');
    if (!footerHost) return;

    footerHost.innerHTML = `
        <footer class="py-12 border-t-4 border-white/10 px-6 bg-black/80 relative z-10">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-lg">
                <div class="flex flex-col mb-4 md:mb-0">
                    <p data-i18n="footer.copyright">Radiance. Unofficial Minecraft Mod Project.</p>
                    <p class="text-sm mt-2 opacity-50" data-i18n="footer.credits">Features Vulkan, DLSS and FSR technology. All trademarks are property of their respective owners.</p>
                </div>
                <div class="footer-links">
                    <a href="https://buymeacoffee.com/radiance.mod" target="_blank" rel="noopener noreferrer" class="hover:text-orange-400" data-i18n="footer.sponsor">Sponsor</a>
                    <a href="docs.html" class="hover:text-orange-400">Wiki</a>
                    <a href="https://github.com/Minecraft-Radiance/Radiance" target="_blank" rel="noopener noreferrer" class="hover:text-orange-400">GitHub</a>
                    <a href="https://discord.gg/y4Uzf6acqk" target="_blank" rel="noopener noreferrer" class="hover:text-orange-400">Discord</a>
                    <a href="https://www.youtube.com/@RadianceMod" target="_blank" rel="noopener noreferrer" class="hover:text-orange-400">YouTube</a>
                    <a href="https://space.bilibili.com/3690995826821185" target="_blank" rel="noopener noreferrer" class="hover:text-orange-400">Bilibili</a>
                </div>
            </div>
        </footer>
    `;
}

renderFooter();
