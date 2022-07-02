import Link from "next/link";
import css from "../styles/Layout.module.css";
export default function Header() {
    return (
        <div className={css.header}>
            <Link href={"/"}>
                <h1 style={{ cursor: "pointer" }}>NextJS State Management</h1>
            </Link>
        </div>
    );
}
