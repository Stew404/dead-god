import { getCurrentName } from "@/utils/getCurrentName";
import { Transformation } from "@/types/Item";

export default function Transformations({
    transformations,
}: {
    transformations: Transformation[];
}) {
    if (!transformations) {
        return null;
    }

    return (
        <>
            {transformations.map((transformation: Transformation) => {
                const name = getCurrentName(transformation.name);
                return (
                    <p
                        style={{ color: "#FBCEB1", marginBottom: "15px" }}
                        key={transformation.id}
                    >
                        Часть превращения {name}
                    </p>
                );
            })}
        </>
    );
}
