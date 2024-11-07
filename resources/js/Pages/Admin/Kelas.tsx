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
    const kelas: Array<kelas> = props.kelas as Array<kelas>;
    
    const [namaKelas, setNamaKelas] = useState<string>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post("/admin/kelas", {
            nama_kelas: namaKelas,
        });
    };

    return (
        <AdminLayput>
            <div className="container mx-auto p-5 ">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Tambah Kategori Baru
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
                            Daftar Kategori
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        ID
                                    </TableHead>
                                    <TableHead>Nama Kategori</TableHead>
                                    <TableHead>EDIT</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {kelas.map((item, index) => (
                                    <TableRow key={item.id_kelas}>
                                        <TableCell>{index++}</TableCell>
                                        <TableCell>{item.nama_kelas}</TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger>
                                                    EDIT
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Are you absolutely
                                                            sure?
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot
                                                            be undone. This will
                                                            permanently delete
                                                            your account and
                                                            remove your data
                                                            from our servers.
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
