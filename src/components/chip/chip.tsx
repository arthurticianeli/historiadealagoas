import "./chip.css";


interface ChipProps {
    readonly category: string;
    readonly small?: boolean;
}

function Chip({ category, small }: ChipProps) {
    return (
        <span className={`chip uppercase ${small ? "text-xs" : "text-lg"} mt-3`}>
            {category}
        </span>
    )
}

export default Chip