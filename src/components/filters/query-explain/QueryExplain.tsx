import { useState, type FC, type ReactNode } from 'react'
import Divider from '@mui/material/Divider'
import List, { type ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack, { type StackProps } from '@mui/material/Stack'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const Container = (props: ListProps) => (
	<List
		dense
		{...props}
		sx={{
			display: 'grid',
			gridTemplateColumns: 'auto 1fr',
			paddingTop: (theme) => theme.spacing(0.5),
			paddingBottom: 0,
			columnGap: (theme) => ({
				xs: theme.spacing(1),
				sm: theme.spacing(3),
			}),
			...props.sx,
		}}
	/>
)

const Row = styled(ListItem)(() => ({
	display: 'grid',
	gridColumn: 'span 2',
	gridTemplateColumns: 'subgrid',
	paddingBottom: 0,
}))

const Head: FC<{ children: ReactNode }> = ({ children }) => {
	const [expanded, setExpanded] = useState(false)

	function handleClick() {
		setExpanded(!expanded)
	}

	return (
		<Button
			variant='text'
			onClick={handleClick}
			sx={{
				display: 'inline',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				padding: 0,
				textAlign: 'left',
				color: 'text.primary',
				fontWeight: 'normal',
				...(expanded && {
					overflow: 'initial',
					textOverflow: 'initial',
					whiteSpace: 'initial',
				}),
			}}
		>
			{children}
		</Button>
	)
}

const WrappableStack = (props: StackProps) => (
	<Stack direction='row' flexWrap='wrap' rowGap={0.5} {...props} />
)

const ExampleContainer = (props: StackProps) => (
	<Stack direction='row' alignItems='end' {...props} />
)

const Example = (props: TypographyProps) => (
	<Typography
		variant='body2'
		{...props}
		sx={{
			whiteSpace: 'pre',
			border: 'solid 1px',
			borderColor: (theme) => theme.palette.text.secondary,
			marginRight: '1px',
			...props.sx,
		}}
	/>
)

const Note = (props: TypographyProps) => (
	<Typography
		variant='caption'
		{...props}
		sx={{
			color: (theme) => theme.palette.text.secondary,
			whiteSpace: 'nowrap',
			...props.sx,
		}}
	/>
)

export function QueryExplain() {
	return (
		<Container>
			<Row>
				<Head>andとして扱われる文字</Head>
				<WrappableStack>
					<ExampleContainer>
						<Example
							sx={{
								paddingLeft: '1px',
								paddingRight: '1px',
							}}
						>
							&
						</Example>
						<Typography sx={{ mr: 1 }}>,</Typography>
					</ExampleContainer>
					<ExampleContainer>
						<Example>{'　'}</Example>
						<Note>(全角スペース)</Note>
						<Typography sx={{ mr: 1 }}>,</Typography>
					</ExampleContainer>
					<ExampleContainer>
						<Example>。</Example>
					</ExampleContainer>
				</WrappableStack>
			</Row>
			<Divider sx={{ gridColumn: 'span 2' }} />
			<Row>
				<Head>orとして扱われる文字</Head>
				<WrappableStack>
					<ExampleContainer>
						<Example
							sx={{
								paddingLeft: '2px',
								paddingRight: '2px',
							}}
						>
							|
						</Example>
						<Note>(パイプ)</Note>
						<Typography sx={{ mr: 1 }}>,</Typography>
					</ExampleContainer>
					<ExampleContainer>
						<Example sx={{ px: '2px' }}>,</Example>
						<Note>(コンマ)</Note>
						<Typography sx={{ mr: 1 }}>,</Typography>
					</ExampleContainer>
					<ExampleContainer>
						<Example>、</Example>
						<Note>(全角読点)</Note>
					</ExampleContainer>
				</WrappableStack>
			</Row>
		</Container>
	)
}
