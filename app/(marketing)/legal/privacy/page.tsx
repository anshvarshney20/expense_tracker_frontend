
export default function PrivacyPage() {
    return (
        <>
            <h1>Privacy Protocol</h1>
            <p>Last Audit: February 2026</p>

            <section className="mt-20 space-y-12">
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white">1. Data Sovereignty</h2>
                    <p>
                        At Æquitas, we operate under the principle of absolute individual sovereignty. Your capital ledger is your property.
                        We utilize end-to-end ZK-proof encryption to ensure that not even the Architecture Team can access your raw transaction hashes.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white">2. Neural Indexing</h2>
                    <p>
                        The Cortex AI processes your movement data locally at the node level before transmitting anonymized drift patterns to our global optimization grid.
                        This ensures that your behavioural intelligence remains private while still benefiting from pooled strategic simulations.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white">3. Third-Party Handshakes</h2>
                    <p>
                        We only perform neural handshakes with verified financial institutions through secure, encrypted APIs.
                        We never sell, lease, or trade your intelligence data to secondary entities.
                    </p>
                </div>
            </section>
        </>
    );
}
