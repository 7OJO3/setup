const { Client, MessageEmbed, MessageActionRow, MessageSelectMenu, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.on('messageCreate', async (message) => {
    if (message.content === '!setup') {

        // --- ROW 1: اختر لونك ---
        const row1 = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('select_color')
                .setPlaceholder('اختر لونك')
                .addOptions([
                    { label: 'اسود', value: '1513243179392958634', emoji: '1513314100854259732' },
                    { label: 'تركوازي', value: '1009292520309657650', emoji: '1513316788794953848' },
                    { label: 'وردي فاتح', value: '1009292649209008219', emoji: '1504598831147253852' },
                    { label: 'ازرق ملكي', value: '1504878838046396456', emoji: '1513317396260196462' },
                    { label: 'سماوي', value: '1009292515284893797', emoji: '1513314186724249811' },
                    { label: 'ازرق', value: '1009292534616440852', emoji: '1502854410336993321' },
                    { label: 'لافندر', value: '1512598933203976453', emoji: '1513333421148082266' },
                    { label: 'ماجنيتا', value: '1009292553843134645', emoji: '1502864947682611270' },
                    { label: 'احمر', value: '1505192936596439080', emoji: '1513313929173139537' },
                    { label: 'كدني', value: '1009292549053231254', emoji: '1502872079391789204' },
                    { label: 'احمر غامق', value: '1009292577658380348', emoji: '1503346111253839922' },
                    { label: 'منت', value: '1512598914610626600', emoji: '1513336672870469793' },
                    { label: 'انديقو', value: '1009292558616240149', emoji: '1513315181080346714' },
                    { label: 'فايولت', value: '1512598931996151900', emoji: '1513336703098552492' },
                    { label: 'مدنايت', value: '1512598932864368670', emoji: '1513335404689100967' },
                    { label: 'وردي فاتح (Pinkish)', value: '1009292524894027836', emoji: '1513336728998514708' },
                    { label: 'برتقالي', value: '1505663380092883197', emoji: '1513316827726352414' }
                ])
        );

        // --- ROW 2: رتبة ارسال Profiles ---
        const row2 = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('select_profile')
                .setPlaceholder('رتبة ارسال Profiles')
                .addOptions([
                    { label: 'Profile', value: '1501374221992071348', description: 'رتبه لارسال افتارات بنفسك بروم الافتارات' }
                ])
        );

        // --- ROW 3: القبائل ---
        const row3 = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('select_tribe')
                .setPlaceholder('اختر قبيلتك')
                .addOptions([
                    { label: 'الرشيدي', value: '1233419844976902166' },
                    { label: 'التميمي', value: '1497815692056203355' },
                    { label: 'الدوسري', value: '1497815585164361849' },
                    { label: 'الغامدي', value: '1497815539056382052' },
                    { label: 'العنزي', value: '1497815965172367521' },
                    { label: 'العتيبي', value: '1497815261473017977' },
                    { label: 'السبيعي', value: '1497815384336633886' },
                    { label: 'الشمري', value: '1497815322500272128' },
                    { label: 'العازمي', value: '1497816297365311699' },
                    { label: 'الظفيري', value: '1497816259075510292' },
                    { label: 'المطيري', value: '1497816231305023608' },
                    { label: 'القحطاني', value: '1497815772016279642' },
                    { label: 'الشريف', value: '1497816414931910838' },
                    { label: 'الزهران', value: '1497816450084245685' },
                    { label: 'بني خالد', value: '1497816388025188542' },
                    { label: 'حرب', value: '1497816161071661058' }
                ])
        );

        const embed = new MessageEmbed()
            .setTitle('اختار رتبتك')
            .setDescription('استخدم القوائم أدناه لتحديد رتبك.')
            .setImage('https://cdn.discordapp.com/attachments/1501300022808023351/1524370120250490890/image0.jpg?ex=6a50d14e&is=6a4f7fce&hm=851cfe2e136d58fb5b9cf10221db545542c05af6a83318dbcf225c031aec9f7b'); // ضعي رابط صورتك هنا

        await message.channel.send({ embeds: [embed], components: [row1, row2, row3] });
    }
});

// نظام الـ Toggle (إضافة/إزالة)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu()) return;
    
    const roleId = interaction.values[0];
    const member = interaction.member;

    if (member.roles.cache.has(roleId)) {
        await member.roles.remove(roleId);
        await interaction.reply({ content: `تمت إزالة الرتبة بنجاح.`, ephemeral: true });
    } else {
        await member.roles.add(roleId);
        await interaction.reply({ content: `تم إعطاؤك الرتبة بنجاح!`, ephemeral: true });
    }
});

// بدلاً من config.token
client.login(process.env.TOKEN);
