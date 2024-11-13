import AdminCardPaslon from "@/components/AdminCardPaslon";
import EditCardPaslon from "@/components/AdminCardPaslon";
import CardPaslon from "@/components/CardPaslon";
import AdminLayput from "@/Layouts/AdminLayout";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";

function EditPaslon() {
    const { props } = usePage();
    console.log(props);

    const site_url: string = props.site_url as string;
    const paslon_kategori: Array<paslon_kategori> =
        props.paslon_kategori as Array<paslon_kategori>;

    return (
        <AdminLayput>
            <main className="py-5">
                <div className="paslon p-5 mt-10 justify-center w-full gap-2 flex-wrap">
                    {paslon_kategori.map((item, index) => (
                        <div className="paslon w-full gap-2 flex-wrap">
                            <h1 className="font-bold text-center text-slate-700 text-2xl">
                                {item.nama_kategori}
                            </h1>
                            <div className="flex w-full items-center justify-center gap-5 mt-5">
                                {item.paslon.map((paslon, i) => (
                                    <AdminCardPaslon
                                        paslon={paslon}
                                        site_url={site_url}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </AdminLayput>
    );
}

export default EditPaslon;
