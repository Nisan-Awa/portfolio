import React from "react";

export function Footer() {
    return (
        <footer className="py-12 border-t border-border bg-background">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Micromilimeter</h2>
                <p className="text-muted-foreground text-sm mb-8">
                    Supplementary outer space material
                </p>
                <div className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Awa Nisan Tojah. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
