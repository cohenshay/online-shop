import { useState, useEffect } from "react";
function useFetch(url, callback) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        if (json) {
            setData(json.clientToken);
            setLoading(false);
            callback()
        }
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
}
export { useFetch };