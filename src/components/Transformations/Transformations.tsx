import { Transformation } from "@/types/Item";


export default function Transformations({transformations}: {transformations: Transformation[]}){
    return (
        <>
        {
            transformations.map((transformation: Transformation)=>{
                return <p style={{color: "#FBCEB1", marginBottom: "15px"}} key={transformation.id}>
                    Часть превращения {transformation.name.en}
                </p>
            })
        }
        </>
    )
}

