"use client"

import PublicBanners from 'src/components/banner/publicBanners';

function ExemploBanners() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Exemplo de Uso dos Banners
            </h1>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Banner Topo 1 */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Banner Topo 1</h2>
                    <PublicBanners position="topo-1" className="mb-4" />
                </section>

                {/* Banner Topo 2 */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Banner Topo 2</h2>
                    <PublicBanners position="topo-2" className="mb-4" />
                </section>

                {/* Conteúdo Exemplo */}
                <section className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Conteúdo do Site</h2>
                    <p className="text-gray-600 mb-4">
                        Este é um exemplo de como os banners apareceriam no site público. 
                        Apenas os banners configurados para o dia atual da semana são exibidos.
                    </p>
                    <p className="text-gray-600">
                        Os banners são carregados automaticamente e apenas aqueles que têm 
                        o dia de hoje em sua configuração de exibição aparecerão.
                    </p>
                </section>

                {/* Banners Menores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Banner Menor 1</h2>
                        <PublicBanners position="menor-1" />
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Banner Menor 2</h2>
                        <PublicBanners position="menor-2" />
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Banner Menor 3</h2>
                        <PublicBanners position="menor-3" />
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Banner Menor 4</h2>
                        <PublicBanners position="menor-4" />
                    </section>
                </div>

                {/* Todos os banners do dia */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Todos os Banners de Hoje</h2>
                    <PublicBanners />
                </section>
            </div>
        </div>
    );
}

export default ExemploBanners;
