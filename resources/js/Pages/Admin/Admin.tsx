import AdminLayput from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

function Admin() {

    const {props} = usePage()
    const paslon_kategori: Array<paslon_kategori> = props.paslon_kategori as Array<paslon_kategori>;

    return ( 

        <AdminLayput>
            <h1>hello</h1>
        </AdminLayput>
     );
}

export default Admin;