import axios from "axios";

const YoutubeApi = {
    httpClient: axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    }),

    search(keyword: string | undefined) {
        return keyword ? this.getVideosByKeyword(keyword) : this.getPopularVideos();
    },

    async getVideosByKeyword(keyword: string) {
        const response = await this.httpClient.get("search", {
            params: {
                part: "snippet",
                maxResults: 25,
                q: keyword,
            },
        });
        return response.data.items.map((item: any) => ({
            ...item,
            id: item.id.videoId,
        }));
    },

    async getPopularVideos() {
        const response = await this.httpClient.get("videos", {
            params: {
                part: "snippet",
                maxResults: 25,
                chart: "mostPopular",
                regionCode: "KR",
            },
        });
        return response.data.items;
    },
};

export default YoutubeApi;
