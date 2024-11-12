import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayput from "@/Layouts/AdminLayout";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const VotingTimeSettings = () => {
    const { toast } = useToast();

    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const start = new Date(
            `${startDate}T${startTime}`
        ).toLocaleDateString();
        const end = new Date(`${endDate}T${endTime}`).toString();

        if (end <= start) {
            setError("Waktu selesai harus lebih besar dari waktu mulai");
            return;
        }

        setError("");

        const values = {
            begin: `${startDate}T${startTime}`,
            end: `${endDate}T${endTime}`,
        };

        router.put("/admin/waktu", values, {
            onSuccess: () => {
                toast({
                    title: "Berhasil",
                    description: "Berhasil mengubah waktu voting",
                });
            },
            onError: (error) => {
                toast({
                    title: "Gagal",
                    description: "Gagal mengubah waktu voting",
                    variant: "destructive",
                });
            },
        });

        // Kirim data ke server atau simpan ke database
    };

    return (
        <AdminLayput>
            <Toaster />
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Pengaturan Waktu Voting
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block font-medium">
                                    Waktu Mulai
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <Input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block font-medium">
                                    Waktu Selesai
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) =>
                                                setEndDate(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <Input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <Button type="submit" className="w-full">
                            Simpan Pengaturan Waktu
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AdminLayput>
    );
};

export default VotingTimeSettings;
