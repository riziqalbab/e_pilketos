import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import { PageProps as AppPageProps } from "./";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;

    interface kategori {
        id_kategori: number;
        nama_kategori: string;
    }

    interface paslon {
        id_paslon: number;
        deskripsi: string;
        id_kategori: number;
        img_paslon: string;
        nomor_urut: number;
        nama_paslon: string;
        count: number
    }
}

declare module "@inertiajs/core" {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
