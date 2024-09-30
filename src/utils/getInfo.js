const getListings = async () => {
    try {
        const response = await fetch(
            `https://obash-api.vercel.app/api/listings/`,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch listings.");
        }

        const data = await response.json();
        const listings = data[0]?.listings || [];
        return listings;
    } catch (error) {
        throw error;
    }
}


setTimeout(() => {
    console.log(getListings());
}, 4000);