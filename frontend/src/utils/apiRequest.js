const apiRequest={
    post: async (url,data)=>{
        const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}${url}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        }
    );
    return await response.json();
},
    get: async (url)=>{
        const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}${url}`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				credentials: "include",
			}
		);

		return await response.json();
    },
    post_withoutData: async (url)=>{
        const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}${url}`,
			{
				method: "post",
				credentials: "include",
			}
		);
		return await response.json();
    },
    post_formData:async(url,data)=>{
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_BASE_URL}${url}`,
            {
                method: "post",
                headers: {
                    // "Content-Type": "application/json",  ///remove this line for formdata upload
                    Accept: "application/json",
                },
                body: data,
                credentials: "include",
            }
        );
        return await response.json();
    }

}

export default apiRequest;