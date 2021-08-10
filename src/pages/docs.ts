import Index from "../components";
import { en, it } from "../utils/lang";

export default function() {
	return {
		"/index.html": Index(en).toString(),
		"/it.html": Index(it).toString()
	};
}
