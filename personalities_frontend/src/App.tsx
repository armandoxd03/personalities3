import { useState, useEffect } from 'react';
// import { animeList } from './data.tsx';
import './App.css';
import {
  Card, CardMedia, CardContent, CardActions, Collapse,
  IconButton, Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Anime {
  id: number;
  name: string;
  description: string;
  url: string;
  alt: string;
  artist: string;
}

export default function AnimeCard() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const hasNext = index < animeList.length - 1;
  const hasBack = index > 0;

  useEffect(() => {
    fetch('http://localhost:8080/ducut/personalities')
      .then(res => res.json())
      .then(data => {
        setAnimeList(data);
      })
      .catch(err => {
        console.error('Error fetching personalities:', err);
      });
  }, []);

  function handleNextClick() {
    setIndex(hasNext ? index + 1 : 0);
  }

  function handleBackClick() {
    setIndex(hasBack ? index - 1 : animeList.length - 1);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  if (animeList.length === 0) {
    return <div className="anime-box"><p>NO DATA...</p></div>;
  }

  let anime = animeList[index];

  return (
    <div className="anime-box" style={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 345 }} className="anime-card">
        <CardContent>
          <Typography variant="h5" component="h2" className="anime-title">
            John Roy Ducut - C-PEITEL3
          </Typography>
          <Typography variant="h6" component="h3">
            My Anime List
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {index + 1} of {animeList.length}
          </Typography>
        </CardContent>

        <CardMedia
          component="img"
          image={anime.url}
          alt={anime.alt}
          className="anime-image"
        />

        <CardActions
          className="card-actions"
          sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
        >
          <IconButton aria-label="back" onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>

          <IconButton aria-label="next" onClick={handleNextClick}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>

        <CardContent>
          <Typography variant="h6" className="anime-title">
            {anime.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {anime.artist}
          </Typography>

          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              display: 'block',
              marginLeft: 'auto'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{anime.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

