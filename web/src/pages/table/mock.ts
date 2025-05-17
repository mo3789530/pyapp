import { useEffect, useState } from "react";


function mockApiCall({}) {

}

export function useMoackApi(
    query: string = "",
    {
        pagination: {limit: number = 10, skip: number = 0} = {},
        sort: {field = "id", order = "desc"} = {},

    } = {},
) {
    const [data, setData] = useState<any[]>([]);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        const {res, abort} = mockApiCall({

        });


    }, [])



    return [data, count, loading]

}