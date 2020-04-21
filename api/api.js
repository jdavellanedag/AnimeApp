const cheerio = require('cheerio');
const cloudscraper = require('cloudscraper');
const {
    BASE_URL,
    SEARH_URL
} = require('../config/urls');

/**
 * 
 * Search anime
 * 
 * @param {String} query Query phrase for search anime
 */
const search = async(query) => {

    const req = await cloudscraper(`${SEARH_URL}${query}`, { method: 'GET' });
    const body = await req;
    const $ = cheerio.load(body);
    const list = [];
    console.log(`Searching anime: ${query}`);
    $('div.Container ul.ListAnimes li article').each((i, element) => {
        const $element = $(element);
        const animeflvId = $element.find('a').attr('href').split('/')[2];
        const title = $element.find('a h3').text();
        const animeflvPath = $element.find('a').attr('href');
        let anime = {
            animeflvId,
            title,
            animeflvPath
        };
        list.push(
            anime
        )
    });

    let res = {
        message: `Search: ${query}`,
        animeList: list
    }

    return res;
}

const getDetailsAnimeById = async(id) => {
    /* 
    Pendiente: Se pasa el idanimeflv, 
    se consulta en base de datos el path 
    y se llama el método getDetailsAnimeByPath()
    */
}

const getDetailsAnimeByPath = async(word, id, name) => {
    const path = `${BASE_URL}/${word}/${id}/${name}`;
    const req = await cloudscraper(path, { method: 'GET' });
    const body = await req;
    const $ = cheerio.load(body);

    console.log(`Calling: ${path}`);
    console.log(`Getting details for:${word} ${id} ${name}`);

    const title = $('div.Ficha div.Container h2').text();
    const score = $('div.Ficha div.Container div.vtshr div.Votes span.vtprmd').text();
    const img = $('div.AnimeCover div.Image figure img').attr('src') || 'Not Found';
    const status = $('div.Container p.AnmStts span').text();
    const description = $('div.Container main div.Description p').text();
    const genres = [];
    $('div.Container main nav.Nvgnrs a').each((i, genre) => {
        const $genre = $(genre);
        genres.push(
            $genre.text()
        )
    });
    const totalEpisodes = $('div.Container main ul.ListCaps li').length;
    const nextEpisode = $('div.Container main ul.ListCaps').children().first().find('span.Date').text() || 'Not Found';

    let details = {
        title,
        score,
        img,
        status,
        description,
        genres,
        totalEpisodes,
        nextEpisode
    }

    let res = {
        message: `Details: ${word} ${id} ${name}`,
        details
    }

    return res;

}

module.exports = {
    search,
    getDetailsAnimeByPath
}