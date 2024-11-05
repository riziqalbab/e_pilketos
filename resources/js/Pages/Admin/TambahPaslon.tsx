import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import AdminLayput from "@/Layouts/AdminLayout";
import { Editor } from "@/components/Editor";

export default function AddCandidateForm() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [misi, setMisi] = useState();
    const [visi, setVisi] = useState();

    const [formData, setFormData] = useState({
        paslonName: "",
        ketuaName: "",
        wakilName: "",
        nomorUrut: "",
        visi: "",
        misi: "",
        foto: null as File | null,
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            const fileInput = e.target as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];
                setFormData((prev) => ({ ...prev, [name]: file }));
                setPreviewUrl(URL.createObjectURL(file));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleEditorChange = (name: string) => (content: string) => {
        setFormData((prev) => ({ ...prev, [name]: content }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Data Kandidat Berhasil Ditambahkan",
            description: "Data kandidat telah berhasil disimpan.",
        });
        setFormData({
            paslonName: "",
            ketuaName: "",
            wakilName: "",
            nomorUrut: "",
            visi: "",
            misi: "",
            foto: null,
        });
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
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
                                <Label htmlFor="paslonName">
                                    Nama Pasangan Calon
                                </Label>
                                <Input
                                    id="paslonName"
                                    name="paslonName"
                                    value={formData.paslonName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ketuaName">
                                    Nama Calon Ketua
                                </Label>
                                <Input
                                    id="ketuaName"
                                    name="ketuaName"
                                    value={formData.ketuaName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="wakilName">
                                    Nama Calon Wakil
                                </Label>
                                <Input
                                    id="wakilName"
                                    name="wakilName"
                                    value={formData.wakilName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nomorUrut">Nomor Urut</Label>
                                <Input
                                    id="nomorUrut"
                                    name="nomorUrut"
                                    type="number"
                                    value={formData.nomorUrut}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="visi">Visi</Label>
                                <Editor onChange={(e) => {}} content="" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="misi">Misi</Label>
                                <Editor onChange={(e) => {}} content="" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="foto">Foto Kandidat</Label>
                                <Input
                                    id="foto"
                                    name="foto"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
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
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayput>
    );
}
