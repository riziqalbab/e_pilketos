import CardPaslon from "@/components/CardPaslon";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

function Home() {
    const { props } = usePage();
    const is_user_voted: Array<any> = props.is_user_voted as Array<any>;

    const [canVote, setCanVote] = useState(false);
    const time_vote: time_vote = props.time_vote as time_vote;

    const time_vote_start = new Date(time_vote.begin);
    const time_vote_end = new Date(time_vote.end);
    const [messageCountdown, setMessageCountdown] = useState<string>("");

    const [day, setDay] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const countdown_before_vote = time_vote_start.getTime() - now;
            const countdown_after_vote = time_vote_end.getTime() - now;

            if (countdown_before_vote > 0) {
                setMessageCountdown("Countdown Pemilihan Calon");

                setDay(
                    Math.floor(countdown_before_vote / (1000 * 60 * 60 * 24))
                );
                setHour(
                    Math.floor(
                        (countdown_before_vote % (1000 * 60 * 60 * 24)) /
                            (1000 * 60 * 60)
                    )
                );
                setMinute(
                    Math.floor(
                        (countdown_before_vote % (1000 * 60 * 60)) / (1000 * 60)
                    )
                );
                setSecond(
                    Math.floor((countdown_before_vote % (1000 * 60)) / 1000)
                );
            } else if (countdown_after_vote > 0 && countdown_before_vote < 0) {
                setMessageCountdown(
                    "Countdown Waktu Berakhir Pemilihan Calon"
                );
                setDay(
                    Math.floor(countdown_after_vote / (1000 * 60 * 60 * 24))
                );
                setHour(
                    Math.floor(
                        (countdown_after_vote % (1000 * 60 * 60 * 24)) /
                            (1000 * 60 * 60)
                    )
                );
                setMinute(
                    Math.floor(
                        (countdown_after_vote % (1000 * 60 * 60)) / (1000 * 60)
                    )
                );
                setSecond(
                    Math.floor((countdown_after_vote % (1000 * 60)) / 1000)
                );
                setCanVote(true);
            } else {
                setMessageCountdown("Pemilihan Calon Telah Berakhir");
                setDay(0);
                setHour(0);
                setMinute(0);
                setSecond(0);
                setCanVote(false);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const kategori_voted = is_user_voted.map((item: any) => {
        return item.id_kategori;
    });
    const site_url: string = props.site_url as string;
    const paslon_kategori: Array<paslon_kategori> =
        props.paslon_kategori as Array<paslon_kategori>;

    return (
        <MainLayout>
            <main className="py-10 px-4 min-h-screen bg-gradient-to-b from-slate-100 to-slate-400 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        className="text-4xl font-bold text-center text-slate-800 mb-10"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Pemilihan Kandidat
                    </motion.h1>
                    <Countdown
                        message={messageCountdown}
                        day={day}
                        hour={hour}
                        minute={minute}
                        second={second}
                    />
                    <div className="space-y-16">
                        {paslon_kategori.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
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
                                            transition={{
                                                duration: 0.3,
                                                delay: i * 0.1,
                                            }}
                                        >
                                            <CardPaslon
                                                paslon={paslon}
                                                site_url={site_url}
                                                can_vote={
                                                    canVote &&
                                                    !kategori_voted.includes(
                                                        item.id_kategori
                                                    )
                                                }
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {kategori_voted.includes(item.id_kategori) && (
                                    <div className="flex justify-center mt-4">
                                        <h1 className="font-bold text-center text-slate-800 text-xl">
                                            TERIMA KASIH ATAS PILIHAN ANDA
                                        </h1>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}

export default Home;

import { useState, useEffect } from "react";

type CountdownProps = {
    day: number;
    hour: number;
    minute: number;
    second: number;
    message: string;
};

function Countdown({ day, hour, minute, second, message }: CountdownProps) {
    return (
        <div className="text-center bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {message}
            </h2>
            <div className="flex justify-center space-x-4">
                <div className="text-center">
                    <span className="text-4xl font-bold text-slate-800">
                        {day}
                    </span>
                    <p className="text-sm text-slate-600">Hari</p>
                </div>
                <div className="text-center">
                    <span className="text-4xl font-bold text-slate-800">
                        {hour}
                    </span>
                    <p className="text-sm text-slate-600">Jam</p>
                </div>
                <div className="text-center">
                    <span className="text-4xl font-bold text-slate-800">
                        {minute}
                    </span>
                    <p className="text-sm text-slate-600">Menit</p>
                </div>
                <div className="text-center">
                    <span className="text-4xl font-bold text-slate-800">
                        {second}
                    </span>
                    <p className="text-sm text-slate-600">Detik</p>
                </div>
            </div>
        </div>
    );
}
