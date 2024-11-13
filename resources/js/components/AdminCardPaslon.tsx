'use client'

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Editor } from "@/components/Editor"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useForm, usePage } from "@inertiajs/react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from './ui/toaster'

export default function AdminCardPaslon({ paslon, site_url }: { paslon: paslon, site_url: string }) {
  const foto = `${site_url}/paslon/image/${paslon.img_paslon}`
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { props } = usePage()
  const kategori: Array<any> = props.kategori as Array<any>
  const { toast } = useToast()

  const { data, setData, post, progress } = useForm({
    id_paslon: paslon.id_paslon.toString(),
    nama_paslon: paslon.nama_paslon,
    id_kategori: paslon.id_kategori.toString(),
    nomor_urut: paslon.nomor_urut.toString(),
    deskripsi: paslon.deskripsi,
    img_paslon: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/admin/paslon", {
      onSuccess: () => {
        toast({
          title: "DATA KANDIDAT SUKSES DIRUBAH",
        })
      },
    })
  }

  return (
    <Card className="group relative overflow-hidden rounded-lg h-96 w-96">
        <Toaster/>
      <div className="absolute inset-0">
        <img
          src={foto}
          alt="Background"
          width={800}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80" />
      </div>
      <CardContent className="relative p-6 h-full">
        <div className="space-y-4 flex h-full justify-between flex-col">
          <div className="flex items-center gap-3"></div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-200">{paslon.nama_paslon}</h2>
            <div className="text-slate-200 flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>EDIT</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <Card className="w-full">
                    <ScrollArea className="h-[80vh] w-full">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Edit Data Kandidat</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="nama_paslon">Nama Pasangan Calon</Label>
                            <Input
                              id="nama_paslon"
                              name="nama_paslon"
                              value={data.nama_paslon}
                              onChange={(e) => setData("nama_paslon", e.target.value)}
                              required
                            />
                            {props.errors?.nama_paslon && (
                              <Alert variant="destructive">
                                <AlertTitle>{props.errors.nama_paslon}</AlertTitle>
                              </Alert>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nomor_urut">Nomor Urut</Label>
                            <Input
                              id="nomor_urut"
                              name="nomor_urut"
                              type="number"
                              value={data.nomor_urut}
                              onChange={(e) => setData("nomor_urut", e.target.value)}
                              required
                            />
                            {props.errors?.nomor_urut && (
                              <Alert variant="destructive">
                                <AlertTitle>{props.errors.nomor_urut}</AlertTitle>
                              </Alert>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="kategori">KATEGORI</Label>
                            <Select
                              value={data.id_kategori}
                              onValueChange={(e) => setData("id_kategori", e)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="KATEGORI" />
                              </SelectTrigger>
                              <SelectContent>
                                {kategori.map((item) => (
                                  <SelectItem key={item.id_kategori} value={item.id_kategori.toString()}>
                                    {item.nama_kategori}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="deskripsi">DESKRIPSI</Label>
                            <Editor
                              onChange={(value) => setData("deskripsi", value)}
                              content={data.deskripsi}
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
                                const file = e.target.files?.[0]
                                if (file) {
                                  setData("img_paslon", file)
                                  setPreviewUrl(URL.createObjectURL(file))
                                }
                              }}
                              ref={fileInputRef}
                            />
                            {props.errors?.img_paslon && (
                              <Alert variant="destructive">
                                <AlertTitle>{props.errors.img_paslon}</AlertTitle>
                                <AlertDescription>
                                  File bertipe gambar dengan format jpg/png dan maksimal ukuran 5 Mb
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
                            Update Kandidat
                          </Button>
                        </form>
                      </CardContent>
                    </ScrollArea>
                  </Card>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}