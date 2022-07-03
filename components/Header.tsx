import Link from "next/link";
import css from "../styles/Layout.module.css";
export default function Header() {
    return (
        <div className={css.header}>
            <Link href={"/"}>
                <h2 style={{ cursor: "pointer" }}>NextJS State Management</h2>
            </Link>
        </div>
    );
}
