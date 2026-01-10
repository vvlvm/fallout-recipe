import Divider from '@mui/material/Divider'
import List, { type ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Container = styled((props) => <List dense {...props} />)<ListProps>(
	({ theme }) => ({
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		gap: theme.spacing(1),
		paddingBottom: 0,
	})
)

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

export function QueryExplain() {
	return (
		<Container>
			<Row>
				<Head>andとして扱われる文字</Head>
				<Stack direction='row' alignItems='center'>
					<Example
						sx={{
							paddingLeft: '1px',
							paddingRight: '1px',
						}}
					>
						&
					</Example>
					<Typography sx={{ mr: 1 }}>,</Typography>
					<Example>{'　'}</Example>
					<Note>(全角スペース)</Note>
					<Typography sx={{ mr: 1 }}>,</Typography>
					<Example>。</Example>
				</Stack>
			</Row>
			<Divider sx={{ gridColumn: 'span 2' }} />
			<Row>
				<Head>orとして扱われる文字</Head>
				<Stack direction='row' alignItems='center'>
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
					<Example sx={{ px: '2px' }}>,</Example>
					<Note>(コンマ)</Note>
					<Typography sx={{ mr: 1 }}>,</Typography>
					<Example>、</Example>
					<Note>(全角読点)</Note>
				</Stack>
			</Row>
		</Container>
	)
}
