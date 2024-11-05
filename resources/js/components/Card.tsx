import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function Card() {
    return (
        <div className="max-w-xs w-full rounded-lg group/card">
            <div
                className={cn(
                    " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                    "bg-[url(https://staging.dimensy.id/assets/img/articles/slider/35e34ec4e85a879395466098584eff29.webp)] bg-cover"
                )}
            >
                <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
                <div className="flex flex-row items-center space-x-4 z-10">
                    <div className="h-10 w-10 rounded-full border-2 object-cover flex items-center justify-center bg-white">
                        1
                    </div>
                </div>
                <div className="text content">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                        RIZIQ FULAN
                    </h1>
                    <div className="font-normal text-sm w-96 text-gray-50 relative z-10 my-4 flex gap-2">
                        <Button variant="default" className="bg-white text-blue-950">VOTE</Button>
                        <Dialog>
                            <DialogTrigger>
                                <Button>DETAIL</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        DETAIL PASLON X
                                    </DialogTitle>
                                    <DialogDescription>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident omnis eveniet ex in explicabo tempore, dolores inventore repellendus. Rem, dignissimos blanditiis id explicabo animi libero nesciunt incidunt? Voluptatum dignissimos cupiditate ducimus quas placeat qui fuga tempore omnis aliquid. Ratione, numquam! Officia est voluptatibus ipsa eum possimus, doloribus exercitationem cupiditate earum illum veritatis maxime sapiente ea quo facilis repudiandae! Consequuntur quas nobis odio sapiente culpa optio minus, dolorum obcaecati? Nulla hic totam sunt recusandae ipsa repellat quidem officia placeat modi ea. Illo quasi reprehenderit corrupti ducimus consectetur similique pariatur optio impedit ad magni! Unde excepturi sapiente quidem totam minus odit et.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
