import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { router } from "@inertiajs/react";

export default function CardPaslon({
    paslon,
    site_url,
    can_vote,
}: {
    paslon: paslon;
    site_url: string;
    can_vote?: boolean;
}) {
    const foto = `${site_url + "/paslon/image/" + paslon.img_paslon}`;

    const handleVote = (id: number) => {
        router.put("/vote", {
            id_paslon: id,
        });
    };

    return (
        <Card className="group relative overflow-hidden rounded-lg h-96 w-96">
            {/* Background Image */}
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

            {/* Content */}
            <CardContent className="relative p-6  h-full">
                <div className="space-y-4 flex  h-full justify-between flex-col">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 bg-white rounded-full w-8 h-8 justify-center  ">
                        {paslon.nomor_urut}
                    </div>

                    {/* Card Title and Description */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-slate-200">
                            {paslon.nama_paslon}
                        </h2>
                        <div className="text-slate-200 flex gap-2">
                            {can_vote
                             && (
                                <Button
                                    variant="default"
                                    className="bg-white text-blue-950"
                                >
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            VOTE
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    APAKAH ANDA YAKIN PILIHAN
                                                    ANDA?
                                                </AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    BATAL
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => {
                                                        handleVote(
                                                            paslon.id_paslon
                                                        );
                                                    }}
                                                >
                                                    IYA
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </Button>
                            )}
                            <Dialog>
                                <DialogTrigger>
                                    <Button>DETAIL</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            DETAIL {paslon.nama_paslon}
                                        </DialogTitle>
                                        <DialogDescription className="flex items-center flex-col gap-10 w-full">
                                            <img src={foto} className="w-56" />
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: paslon.deskripsi,
                                                }}
                                                className="w-full"
                                            />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
