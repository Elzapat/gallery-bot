use serenity::{
    prelude::*,
    model::prelude::*,
    framework::standard::{
        Args, CommandResult,
        macros::command,
    },
};

#[command]
pub async fn scan_channel(ctx: &Context, msg: &Message, mut args: Args) -> CommandResult {
    let channel = msg.channel_id.to_channel(&ctx).await?;
    let channel = match channel.guild() {
        Some(guild) => guild,
        None => return Ok(()),
    };

    let gallery_channel = ;

    let messages = channel.messages(&ctx.http, |retriever| {
        retriever.before(channel.last_message_id.unwrap()).limit(25)
    }).await.unwrap();

    for message in messages {
        msg.channel_id.say(&ctx.http, message.content).await?;
    }

    Ok(())
}
