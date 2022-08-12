import { Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { AnyAction } from "redux";
import { CardType } from "../../api/api";
import { getCardTC, updateGradeTC } from "../../bll/cardsReducer";
import { useAppDispatch, useAppSelector } from "../../bll/hooks";



const paperStyle = { padding: 30, height: 'auto', width: 400, margin: '20px auto' }
const styleBTN = { marginTop: '20px' }
const typographyStyle = { marginBottom: '20px' }


const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
	const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
	const rand = Math.random() * sum;
	const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
		const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
		return { sum: newSum, id: newSum < rand ? i : acc.id }
	}
		, { sum: 0, id: -1 });
	console.log('test: ', sum, rand, res)

	return cards[res.id + 1];
}

export const Learn = () => {

	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [first, setFirst] = useState<boolean>(true);
	const [gradeQuestion, setGradeQuestion] = useState<any>(1);
	const { cards } = useAppSelector(store => store.cards);
	const shots = useAppSelector(store => store.cards.shots);
	const id = window.location.hash.split('/').slice(-1)[0]

	console.log('id= ' + id)

	const [card, setCard] = useState<any>({
		_id: '',
		cardsPack_id: '',

		answer: '',
		question: '',
		grade: 0,
		shots: 0,

		type: '',
		rating: 0,
		more_id: '',

		created: '',
		updated: '',
	});

	const dispatch = useAppDispatch();
	useEffect(() => {
		console.log('LearnContainer useEffect');

		if (first) {
			dispatch(getCardTC(id));
			setFirst(false);
		}

		console.log('cards', cards)

		if (cards.length > 0) setCard(getCard(cards));

		return () => {
			console.log('LearnContainer useEffect off');
		}
	}, [dispatch, id, cards, first]);

	const onNext = () => {
		setIsChecked(false)

		if (cards.length > 0) {
			const id = card._id

			dispatch(updateGradeTC(+gradeQuestion, id))
			setCard(getCard(cards))
		} else {

		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGradeQuestion((event.target as HTMLInputElement).value);
  };

	console.log(card)

	return (
		<Grid>
			<Grid container
				direction="column"
				justifyContent="center"
				alignItems="center">
				<h2>Learn: <span>Learn title</span></h2>
			</Grid>
			<Paper elevation={10} style={paperStyle}>
				<Typography style={typographyStyle}>Количество попыток ответов на вопрос: {shots}</Typography>
				<Typography><b>Question: </b> {card.question}</Typography>

				{isChecked && (
					<>
						<div><b>Answer: </b> {card.answer}</div>
						<div style={styleBTN}>Rate yourself:</div>
						<RadioGroup onChange={handleChange}>
							{grades.map((g, i) => (
								<FormControlLabel value={i + 1} key={'grade-' + i}   name={'answer'} control={<Radio />} label={g} />
							))}
						</RadioGroup>
						<Button
							onClick={onNext}
							variant={'contained'}
							fullWidth
							style={styleBTN}
							color={'primary'}>next</Button>
					</>
				)}

				{!isChecked && (
					<Button type={'submit'}
						variant={'contained'}
						color={'primary'}
						style={styleBTN}
						onClick={() => setIsChecked(true)}
						fullWidth>Show answer</Button>
				)}


			</Paper>
		</Grid>
	)
}