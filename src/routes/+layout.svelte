<script>
	import '../app.postcss';

	import { Button } from '$lib/components/ui/button';
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<Button variant="ghost" href="/">Home</Button>
		<Button variant="ghost" href="/login">Log In</Button>
		<Button variant="ghost" href="/register">Register</Button>
	</div>
</header>
<div class="m-auto max-w-4xl px-5 py-5">
	<slot />
</div>
