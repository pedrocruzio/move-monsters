module move_monsters_module::move_monsters_module {
    use std::string::String;

    public struct LessonNFT has key, store {
        id: UID,
        name: String,
        description: String,
        completed_lessons: vector<String>,
    }

    public entry fun mint_nft(name: String, description: String, ctx: &mut TxContext) {
        let nft = LessonNFT {
            id: object::new(ctx),
            name,
            description,
            completed_lessons: vector::empty(),
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    public entry fun add_completed_lesson(nft: &mut LessonNFT, lesson: String) {
        vector::push_back(&mut nft.completed_lessons, lesson);
    }

    public fun get_completed_lessons(nft: &LessonNFT): &vector<String> {
        &nft.completed_lessons
    }

    public fun get_name(nft: &LessonNFT): &String {
        &nft.name
    }

    public fun get_description(nft: &LessonNFT): &String {
        &nft.description
    }
}
