import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AdminLayput from "@/Layouts/AdminLayout";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { router, usePage } from "@inertiajs/react";
export default function Kelas() {
    const { props } = usePage();

    console.log(props);
    
    const kelas: Array<kelas> = props.kelas as Array<kelas>;
    const [editNamaKelas, setEditNamaKelas] = useState<string>();
    const [namaKelas, setNamaKelas] = useState<string>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post("/admin/kelas", {
            nama_kelas: namaKelas,
        });
    };

    const handleEdit = (id_kelas: number) => {
        router.put("/admin/kelas", {
            id_kelas: id_kelas,
            nama_kelas: editNamaKelas,
        });
    };

    return (
        <AdminLayput>
            <div className="container mx-auto p-5 ">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Tambah Kelas Baru
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="categoryName">Nama Kelas</Label>
                                <Input
                                    id="kelas"
                                    onChange={(e) => {
                                        setNamaKelas(e.target.value);
                                    }}
                                    placeholder="Masukkan nama kategori"
                                    required
                                />
                            </div>
                            {props.errors.nama_kelas && (
                                <Alert variant="destructive">
                                    <AlertTitle>
                                        {props.errors.nama_kelas}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <Button type="submit">Tambah Kelas</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Daftar Kelas
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Nomor
                                    </TableHead>
                                    <TableHead>Nama Kelas</TableHead>
                                    <TableHead>EDIT</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {kelas.map((item, index) => (
                                    <TableRow key={item.id_kelas}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.nama_kelas}</TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger
                                                    onClick={() =>
                                                        setEditNamaKelas(
                                                            item.nama_kelas
                                                        )
                                                    }
                                                >
                                                    EDIT
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit Nama Kelas{" "}
                                                            {item.nama_kelas}
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            <form className="mt-4">
                                                                <Input
                                                                    type="text"
                                                                    value={
                                                                        editNamaKelas
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setEditNamaKelas(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />

                                                                <Button
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            item.id_kelas
                                                                        )
                                                                    }
                                                                    className="my-4 float-right"
                                                                >
                                                                    KIRIM
                                                                </Button>
                                                            </form>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {kelas.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            className="text-center text-muted-foreground"
                                        >
                                            Belum ada kelas. Tambahkan kelas
                                            baru di atas.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayput>
    );
}
