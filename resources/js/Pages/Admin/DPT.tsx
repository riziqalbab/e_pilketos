"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminLayput from "@/Layouts/AdminLayout";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { router, usePage } from "@inertiajs/react";
import generateRandomString from "@/lib/generateRandomString";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
export default function DPT() {
    const { toast } = useToast();

    const { props } = usePage();
    const list_kelas: Array<kelas> = props.kelas as Array<kelas>;

    const [namaLengkap, setNamaLengkap] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [ibu, setIbu] = useState<string>();
    const [kelas, setKelas] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const values = {
            username: username,
            nama_lengkap: namaLengkap,
            id_kelas: kelas,
            nama_ibu: ibu,
            password: password,
        };

        router.post("/admin/dpt", values, {
            onSuccess: () => {
                toast({
                    title: "Berhasil",
                    description: "Berhasil menambahkan pemilih baru",
                });
            },
            onError: (error) => {
                toast({
                    title: "Gagal",
                    description: "Gagal menambahkan pemilih baru",
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <AdminLayput>
            <Toaster />
            <div className="container mx-auto p-5 ">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            TAMBAH PEMILIH BARU
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="nama_lengkap">
                                    USERNAME [NIS untuk siswa / NIP untuk guru]
                                </Label>
                                <Input
                                    id="username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                            </div>
                            {props.errors.username && (
                                <Alert variant="destructive">
                                    <AlertTitle>
                                        {props.errors.username}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="nama_lengkap">
                                    NAMA LENGKAP
                                </Label>
                                <Input
                                    id="nama_lengkap"
                                    onChange={(e) => {
                                        setNamaLengkap(e.target.value);
                                    }}
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                            </div>
                            {props.errors.nama_lengkap && (
                                <Alert variant="destructive">
                                    <AlertTitle>
                                        {props.errors.nama_lengkap}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="kelas">KELAS</Label>
                                <Select onValueChange={(e) => setKelas(e)}>
                                    <SelectTrigger id="kelas">
                                        <SelectValue placeholder="KELAS" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {list_kelas.map((item) => (
                                            <SelectItem
                                                key={item.id_kelas}
                                                value={item.id_kelas.toString()}
                                            >
                                                {item.nama_kelas}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {props.errors.id_kelas && (
                                <Alert variant="destructive">
                                    <AlertTitle>
                                        {props.errors.id_kelas}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="lahir">NAMA IBU KANDUNG</Label>
                                <Input
                                    id="ibu"
                                    placeholder="Masukkan nama ibu kandung"
                                    required
                                    onChange={(e) => {
                                        setIbu(e.target.value);
                                    }}
                                />
                            </div>
                            {props.errors.nama_ibu && (
                                <Alert variant="destructive">
                                    <AlertTitle>
                                        {props.errors.nama_ibu}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="lahir">PASSWORD</Label>
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        id="password"
                                        placeholder="Masukkan password"
                                        required
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setPassword(
                                                generateRandomString(7, true)
                                            );
                                        }}
                                    >
                                        GENERATE
                                    </Button>
                                </div>
                            </div>
                            {props.errors.password && (
                                <Alert variant="destructive">
                                    <AlertTitle>
                                        {props.errors.password}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <Button type="submit">TAMBAH PEMILIH</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayput>
    );
}
