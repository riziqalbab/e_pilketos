import PieChartGraph from "@/components/Pie";
import AdminLayput from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

function Admin() {

    const {props} = usePage()
    const paslon_kategori: Array<paslon_kategori> = props.paslon_kategori as Array<paslon_kategori>;

    console.log(paslon_kategori[0].paslon);
    


    return ( 

        <AdminLayput>
            <h1>
                <PieChartGraph paslon={paslon_kategori[0].paslon} />
            </h1>
        </AdminLayput>
     );
}

export default Admin;