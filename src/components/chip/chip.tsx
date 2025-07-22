import "./chip.css";


interface ChipProps {
    readonly category: string;
    readonly small?: boolean;
}

function Chip({ category, small }: ChipProps) {
    return (
        <span className={`chip uppercase mt-3`} style={{ fontSize: small ? '0.75rem' : '0.875rem' }}>
            {category}
        </span>
    )
}

export default Chip