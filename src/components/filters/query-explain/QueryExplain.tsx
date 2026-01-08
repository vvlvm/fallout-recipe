import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack, { type StackProps } from '@mui/material/Stack'

const Container = styled(List)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gap: theme.spacing(1),
}))

const Row = styled(ListItem)(() => ({
	display: 'grid',
	gridColumn: 'span 2',
	gridTemplateColumns: 'subgrid',
}))

const Head = styled((props) => (
	<Typography variant='body2' {...props} />
))<TypographyProps>(({ theme }) => ({
	marginRight: theme.spacing(2),
}))

const Examples = styled(Box)(() => ({
	display: 'flex',
	gap: '1em',
	alignItems: 'center',
}))

const Example = styled((props) => (
	<Typography variant='body2' {...props} />
))<TypographyProps>(({ theme }) => ({
	whiteSpace: 'pre',
	border: 'solid 1px',
	borderColor: theme.palette.text.secondary,
	marginRight: '1px',
}))

const Note = styled((props) => (
	<Typography variant='caption' {...props} />
))<TypographyProps>(({ theme }) => ({
	color: theme.palette.text.secondary,
	whiteSpace: 'nowrap',
}))

const StackExample = styled((props) => (
	<Stack direction='row' alignItems='center' flexWrap='nowrap' {...props} />
))<StackProps>()

export function QueryExplain() {
	return (
		<Container>
			<Row>
				<Head>andとして扱われる文字</Head>
				<Examples>
					<Example
						sx={{
							paddingLeft: '1px',
							paddingRight: '1px',
						}}
					>
						&
					</Example>
					<StackExample>
						<Example> </Example>
						<Note>(スペース)</Note>
					</StackExample>
					<StackExample>
						<Example>{'　'}</Example>
						<Note>(全角スペース)</Note>
					</StackExample>
				</Examples>
			</Row>
			<Divider sx={{ gridColumn: 'span 2' }} />
			<Row>
				<Head>orとして扱われる文字</Head>
				<Examples>
					<StackExample>
						<Example
							sx={{
								paddingLeft: '2px',
								paddingRight: '2px',
							}}
						>
							|
						</Example>
						<Note>(パイプ)</Note>
					</StackExample>
					<StackExample
						sx={{
							paddingLeft: '2px',
							paddingRight: '2px',
						}}
					>
						<Example>,</Example>
					</StackExample>
					<StackExample>
						<Example>、</Example>
						<Note>(全角読点)</Note>
					</StackExample>
				</Examples>
			</Row>
		</Container>
	)
}
