import Card from "@/components/Card";
import MainLayout from "@/Layouts/MainLayout";


function Home() {
    return (
        <MainLayout>
            <main >
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
