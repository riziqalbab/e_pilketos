"use client";

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

import { Alert, AlertTitle } from "@/components/ui/alert";
import { router, usePage } from "@inertiajs/react";
export default function Kategori() {
    const { props } = usePage();
    const kategori: Array<kategori> = props.kategori as Array<kategori>;

    const [namaKategori, setNamaKategori] = useState<string>();

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        router.post("/admin/kategori", {
            nama_kategori: namaKategori,
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
                        <form
                            onSubmit={handleAddCategory}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="categoryName">
                                    Nama Kategori
                                </Label>
                                <Input
                                    id="categoryName"
                                    onChange={(e) => {
                                        setNamaKategori(e.target.value);
                                    }}
                                    placeholder="Masukkan nama kategori"
                                    required
                                />
                            </div>
                            {props.errors.nama_kategori && (
                                <Alert variant="destructive">
                                    <AlertTitle>
                                        {props.errors.nama_kategori}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <Button type="submit">Tambah Kategori</Button>
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
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {kategori.map((item) => (
                                    <TableRow key={item.id_kategori}>
                                        <TableCell>{item.id_kategori}</TableCell>
                                        <TableCell>{item.nama_kategori}</TableCell>
                                    </TableRow>
                                ))}
                                {kategori.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            className="text-center text-muted-foreground"
                                        >
                                            Belum ada kategori. Tambahkan
                                            kategori baru di atas.
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
