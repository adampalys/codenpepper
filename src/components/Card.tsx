import React from 'react';

import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from '@mui/material';

import SpacecraftImg1 from '../assets/spacecraft-1.svg';
import SpacecraftImg2 from '../assets/spacecraft-2.svg';
import SpacecraftImg3 from '../assets/spacecraft-3.svg';
import SpacecraftImg4 from '../assets/spacecraft-4.svg';
import SpacecraftImg5 from '../assets/spacecraft-5.svg';
import SpacecraftImg6 from '../assets/spacecraft-6.svg';
import SpacecraftImg7 from '../assets/spacecraft-7.svg';
import SpacecraftImg8 from '../assets/spacecraft-8.svg';
import SpacecraftImg9 from '../assets/spacecraft-9.svg';

type CardProps = {
    img: number;
    description: string;
    points: number;
    power: number;
    title: string;
}

const Card = ({ img, description, points, power, title }: CardProps) => {
    const getImage = () => {
        switch (img) {
            default:
            case 1:
                return SpacecraftImg1;
            case 2:
                return SpacecraftImg2;
            case 3:
                return SpacecraftImg3;
            case 4:
                return SpacecraftImg4;
            case 5:
                return SpacecraftImg5;
            case 6:
                return SpacecraftImg6;
            case 7:
                return SpacecraftImg7;
            case 8:
                return SpacecraftImg8;
            case 9:
                return SpacecraftImg9;
        }
    }

    return (
        <div>
            <MuiCard sx={{
                borderRadius: 3,
                height: 650,
                width: 475,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'black',
                border: '8px peru outset',
                textAlign: 'center',
            }}>
                <CardHeader
                    sx={{
                        minHeight: 150,
                    }}
                    title={<Typography color="navajowhite" variant="h3">{title}</Typography>}
                />
                <CardMedia
                    component="img"
                    src={getImage()}
                    sx={{
                        width: 300,
                        height: 300,
                    }}
                />
                <CardContent sx={{ height: '100%', width: '100%', position: 'relative' }}>
                    <Typography
                        variant="button"
                        sx={{
                            position: 'absolute',
                            color: 'navajowhite',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '3px navajowhite dotted',
                            borderRadius: '50%',
                            width: 50,
                            height: 50,
                            bottom: 16,
                            right: 32,
                        }}
                    >
                        {power || '?'}
                    </Typography>
                    <Typography
                        color="navajowhite"
                        variant="subtitle1"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </MuiCard>
            {<h1>{points}</h1>}
        </div>
    )
}

export default Card;
