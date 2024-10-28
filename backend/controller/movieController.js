import Movie from '../model/movie.js';
import mongoose from 'mongoose';
import {redisClient} from '../redisDriver.js';
import crypto from 'crypto';



const getHashKey = (params) => {
    let retKey = '';
    if (params) {
      const text = JSON.stringify(params);
      retKey = crypto.createHash('sha256').update(text).digest('hex');
    }
    return 'cache:' + retKey;
  };



export const getMovies = async (req, res) => {
    const params = {
        title: req.query.title,
        yearMin: req.query.yearMin,
        yearMax: req.query.yearMax,
        runtimeMin: req.query.runtimeMin,
        runtimeMax: req.query.runtimeMax,
        ratingMin: req.query.ratingMin,
        ratingMax: req.query.ratingMax,
        limit: req.query.limit,
        fromCache: req.query.fromCache
    };           

    //Hash params
    const hashKey = getHashKey(params);
    //Load from Cache
    const cachedData = await redisClient.get(hashKey);
    const resultData = cachedData ? JSON.parse(cachedData) : [];
  
    if (resultData && resultData.length && params.fromCache=='true') {                
        res.status(200).json({fromCache: true, data:resultData});         
    } else {

        try {   
            //Query Movies         
            const result = await Movie.
                find({
                    title: { $regex: `(?i).${params.title}.`},   //finds every title that contains that word 
                    year: { $gt: params.yearMin, $lt: params.yearMax},
                    runtime: { $gt: params.runtimeMin, $lt: params.runtimeMax},
                    'imdb.rating': { $gt: params.ratingMin, $lt: params.ratingMax},
                    //maybe add more fields?                
                }).
                limit(params.limit).
                exec();

            //Save to cache                
            redisClient.set(hashKey, JSON.stringify(result), {
                EX: 60, // cache expiration in seconds
              });
            //Response
            res.status(200).json({fromCache:false, data:result});    
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }
};
