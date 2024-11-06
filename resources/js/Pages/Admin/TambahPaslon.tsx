import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminLayput from "@/Layouts/AdminLayout";
import { Editor } from "@/components/Editor";
import { useForm, usePage } from "@inertiajs/react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function AddCandidateForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { props } = usePage();
    const kategori: Array<kategori> = props.kategori as Array<kategori>;

    const { toast } = useToast();

    const { data, setData, post, progress } = useForm({
        nama_paslon: "",
        id_kategori: "",
        nomor_urut: "",
        deskripsi: "",
        img_paslon: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/tambah", {
            onSuccess: () => {
                toast({
                    title: "DATA KANDIDAT SUKSES DIBUAT",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                });
            },
        });
    };

    return (
        <AdminLayput>
            <Toaster />
            <div className="container mx-auto p-4">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Tambah Data Kandidat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nama_paslon">
                                    Nama Pasangan Calon
                                </Label>
                                <Input
                                    id="nama_paslon"
                                    name="nama_paslon"
                                    onChange={(e) => {
                                        setData("nama_paslon", e.target.value);
                                    }}
                                    required
                                />
                                {props.errors.nama_paslon && (
                                    <Alert variant="destructive">
                                        <AlertTitle>
                                            {props.errors.nama_paslon}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nomor_urut">Nomor Urut</Label>
                                <Input
                                    id="nomor_urut"
                                    name="nomor_urut"
                                    type="number"
                                    onChange={(e) => {
                                        setData("nomor_urut", e.target.value);
                                    }}
                                    required
                                />
                                {props.errors.nomor_urut && (
                                    <Alert variant="destructive">
                                        <AlertTitle>
                                            {props.errors.nomor_urut}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kategori">KATEGORI</Label>
                                <Select
                                    onValueChange={(e) => {
                                        setData("id_kategori", e);
                                    }}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="KATEGORI" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kategori.map((item, index) => (
                                            <SelectItem
                                                value={item.id_kategori.toString()}
                                            >
                                                {item.nama_kategori}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {props.errors.id_kategori && (
                                    <Alert variant="destructive">
                                        <AlertTitle>
                                            {props.errors.id_kategori}
                                        </AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="visi">DESKRIPSI</Label>
                                <Editor
                                    onChange={(value) => {
                                        setData("deskripsi", value);
                                    }}
                                    content=""
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="foto">Foto Kandidat</Label>
                                <Input
                                    id="foto"
                                    name="foto"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        // @ts-ignore
                                        setData(
                                            "img_paslon",
                                            e.target.files[0]
                                        );
                                        // @ts-ignore
                                        setPreviewUrl(
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
                                        );
                                    }}
                                    ref={fileInputRef}
                                    required
                                />
                                {props.errors.img_paslon && (
                                    <Alert variant="destructive">
                                        <AlertTitle>
                                            {props.errors.img_paslon}
                                        </AlertTitle>
                                        <AlertDescription>
                                            File bertipe gambar dengan format
                                            jpg/png dan maksimal ukuran 2 Mb
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {previewUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={previewUrl}
                                            alt="Preview foto kandidat"
                                            width={200}
                                            height={200}
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Tambah Kandidat
                            </Button>
                            {progress && (
                                <Progress
                                    value={Math.round(
                                        // @ts-ignore
                                        (progress.loaded * 100) / progress.total
                                    )}
                                />
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayput>
    );
}
