import CardPaslon from "@/components/CardPaslon";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

function Home() {
    const { props } = usePage();
    console.log(props);
    
    const site_url: string = props.site_url as string;
    const paslon_kategori: Array<paslon_kategori> = props.paslon_kategori as Array<paslon_kategori>;
        
    return (
        <MainLayout>
            <main className="py-10 px-4 min-h-screen bg-gradient-to-b from-slate-100 to-slate-400 overflow-hidden">
                {/* Animated background elements */}
                {/* <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute left-1/4 bottom-1/4 w-1/2 h-1/2 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div> */}

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1 
                        className="text-4xl font-bold text-center text-slate-800 mb-10"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Pemilihan Kandidat
                    </motion.h1>
                    <div className="space-y-16">
                        {paslon_kategori.map((item, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h2 className="font-bold text-center text-slate-800 text-3xl mb-6 pb-2 border-b-2 border-slate-800">
                                    {item.nama_kategori}
                                </h2>
                                <div className="flex gap-2 flex-wrap justify-center">
                                    {item.paslon.map((paslon, i) => (
                                        <motion.div 
                                            key={i} 
                                            className="transform transition duration-300 hover:scale-105"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: i * 0.1 }}
                                        >
                                            <CardPaslon paslon={paslon} site_url={site_url} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}

export default Home;