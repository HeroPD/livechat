# Create Chat

```xml

<iq from="username@host" type='set'>
	<create 
		xmlns="live:create:chat"
	>
		<name>visitor-name<name>
		...
	<create>
</iq>

<iq from="username@host" to="username@host" type="result">
	<create 
		xmlns="live:create:chat"
		token="token-text"
	/>
</iq>

```

# Get Chat List

# Get Pending Chat List

# Join Chat

```xml

<iq from="username@host" type='set'>
	<join
		xmlns="live:join:chat"
		token="token-text"
	/>
</iq>

```

# Leave Chat

```xml

<iq from="username@host" type='set'>
	<leave
		xmlns="live:join:chat"
		token="token-text"
	/>
</iq>

```

# Load Chat History

```xml

<iq from="username@host" type="get">
	<history
		xmlns="live:history:chat"
		token="token-text"
		since="date"
		limit="100-number"
	/>
</iq>

<iq from="username@host" to="username@host" type="result">
	<history>
		<payload/>
		<payload/>
	</history>
</iq>

```

