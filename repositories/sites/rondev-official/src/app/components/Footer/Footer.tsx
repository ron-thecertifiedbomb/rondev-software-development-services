export function Footer() {
    return (
        <footer className="footer">
            <div>
                <div className="footer-brand syne">RON<span style={{ color: '#c8f542' }}>DEV</span></div>
                <div className="footer-tagline">SOFTWARE DEVELOPMENT SERVICES </div>
            </div>
            <div className="footer-links">
                {['services', 'standard', 'stack', 'about', 'contact'].map(l => (
                    <a key={l} href={`#${l}`}>{l}</a>
                ))}
            </div>
            <div className="footer-info">
                DTI Reg. BN 8153271<br />
                San Jose del Monte, Bulacan<br />
                rondev.com.ph
            </div>
        </footer>
    );
}