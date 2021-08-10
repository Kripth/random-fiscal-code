import Index from "../components";
import { en, it } from "../utils/lang";

export default function() {
	return {
		"/index.html": Index(en).encode(),
		"/it.html": Index(it).encode()
	};
}
