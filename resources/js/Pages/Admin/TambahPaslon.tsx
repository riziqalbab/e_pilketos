import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminLayput from "@/Layouts/AdminLayout";
import { Editor } from "@/components/Editor";
import { useForm, usePage } from "@inertiajs/react";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddCandidateForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { props } = usePage();

    const kategori: Array<kategori> = props.kategori as Array<kategori>;

    const { data, setData, post, progress } = useForm({
        namaPaslon: "",
        nomorUrut: "",
        deskripsi: "",
        foto: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <AdminLayput>
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
                                <Label htmlFor="namaPaslon">
                                    Nama Pasangan Calon
                                </Label>
                                <Input
                                    id="namaPaslon"
                                    name="namaPaslon"
                                    onChange={(e) => {
                                        setData("namaPaslon", e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nomorUrut">Nomor Urut</Label>
                                <Input
                                    id="nomorUrut"
                                    name="nomorUrut"
                                    type="number"
                                    onChange={(e) => {
                                        setData("nomorUrut", e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nomorUrut">KATEGORI</Label>
                                <Select>
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
                                        setData("foto", e.target.files[0]);
                                    }}
                                    ref={fileInputRef}
                                    required
                                />
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
