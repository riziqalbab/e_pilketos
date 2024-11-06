import Card from "@/components/Card";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";

function Home() {
    const { props } = usePage();

    console.log(props);
    
    


    return (
        <MainLayout>
            <main>
                <div className="paslon flex items-start justify-center w-full gap-2 flex-wrap">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </main>
        </MainLayout>
    );
}

export default Home;
