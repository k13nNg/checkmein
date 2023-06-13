import tkinter
from tkinter import *

list_of_fonts = ["Academy Engraved LET", "Al Bayan", "Al Nile", "Al Tarikh", "American Typewriter", "Andale Mono", "Anonymous Pro for Powerline", "Apple Braille", "Apple Chancery", "Apple Color Emoji", "Apple LiGothic", "Apple LiSung", "Apple SD Gothic Neo", "Apple Symbols", "AppleGothic", "AppleMyungjo", "Arial", "Arial Black", "Arial Hebrew", "Arial Hebrew Scholar", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Arimo for Powerline", "Avenir", "Avenir Next", "Avenir Next Condensed", "Ayuthaya", "Baghdad", "Bangla MN", "Bangla Sangam MN", "Baoli SC", "Baoli TC", "Baskerville", "Beirut", "BiauKaiHK", "BiauKaiTC", "Big Caslon", "BM Dohyeon", "BM Hanna 11yrs Old", "BM Hanna Air", "BM Hanna Pro", "BM Jua", "BM Kirang Haerang", "BM Yeonsung", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni Ornaments", "Bradley Hand", "Brush Script MT", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charter", "Cochin", "Comic Sans MS", "Copperplate", "Corsiva Hebrew", "Courier New", "Cousine for Powerline", "Damascus", "DecoType Naskh", "DejaVu Sans Mono for Powerline", "Devanagari MT", "Devanagari Sangam MN", "Didot", "DIN Alternate", "DIN Condensed", "Diwan Kufi", "Diwan Thuluth", "Droid Sans Mono Dotted for Powerline", "Droid Sans Mono for Powerline", "Droid Sans Mono Slashed for Powerline", "Euphemia UCAS", "Farah", "Farisi", "Fira Mono for Powerline", "Futura", "Galvji", "GB18030 Bitmap", "Geeza Pro", "Geneva", "Georgia", "Gill Sans", "Go Mono for Powerline", "Grantha Sangam MN", "Gujarati MT", "Gujarati Sangam MN", "GungSeo", "Gurmukhi MN", "Gurmukhi MT", "Gurmukhi Sangam MN", "Hack", "Hannotate SC", "Hannotate TC", "HanziPen SC", "HanziPen TC", "HeadLineA", "Hei", "Heiti SC", "Heiti TC", "Helvetica", "Helvetica Neue", "Herculanum", "Hiragino Maru Gothic ProN", "Hiragino Mincho ProN", "Hiragino Sans", "Hiragino Sans CNS", "Hiragino Sans GB", "Hoefler Text", "IBM 3270", "IBM 3270 Narrow", "IBM 3270 Semi-Narrow", "Impact", "InaiMathi", "Inconsolata for Powerline", "Inconsolata-dz for Powerline", "Inconsolata-g for Powerline", "ITF Devanagari", "ITF Devanagari Marathi", "Kai", "Kailasa", "Kaiti SC", "Kaiti TC", "Kannada MN", "Kannada Sangam MN", "Kefa", "Khmer MN", "Khmer Sangam MN", "Klee", "Kohinoor Bangla", "Kohinoor Devanagari", "Kohinoor Gujarati", "Kohinoor Telugu", "Kokonor", "Krungthep", "KufiStandardGK", "Lantinghei SC", "Lantinghei TC", "Lao MN", "Lao Sangam MN", "Liberation Mono for Powerline", "Libian SC", "Libian TC", "LiHei Pro", "LingWai SC", "LingWai TC", "LiSong Pro", "Lucida Grande", "Luminari", "Malayalam MN", "Malayalam Sangam MN", "Marker Felt", "Menlo", "Meslo LG L DZ for Powerline", "Meslo LG L for Powerline", "Meslo LG M DZ for Powerline", "Meslo LG M for Powerline", "Meslo LG S DZ for Powerline", "Meslo LG S for Powerline", "Microsoft Sans Serif", "Mishafi", "Mishafi Gold", "Monaco", "monofur for Powerline", "Mshtakan", "Mukta Mahee", "Muna", "Myanmar MN", "Myanmar Sangam MN", "Nadeem", "Nanum Brush Script", "Nanum Gothic", "Nanum Myeongjo", "Nanum Pen Script", "New Peninim MT", "Noteworthy", "Noto Mono for Powerline", "Noto Nastaliq Urdu", "Noto Sans Kannada", "Noto Sans Myanmar", "Noto Sans Oriya", "Noto Serif Myanmar", "NovaMono for Powerline", "Optima", "Oriya MN", "Oriya Sangam MN", "Osaka", "Palatino", "Papyrus", "Party LET", "PCMyungjo", "Phosphate", "PilGi", "PingFang HK", "PingFang SC", "PingFang TC", "Plantagenet Cherokee", "ProFont for Powerline", "PSL Ornanong Pro", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "PT Serif Caption", "Raanana", "Roboto Mono for Powerline", "Roboto Mono Light for Powerline", "Roboto Mono Medium for Powerline", "Roboto Mono Thin for Powerline", "Rockwell", "Sana", "Sathu", "Savoye LET", "Shree Devanagari 714", "SignPainter", "Silom", "SimSong", "Sinhala MN", "Sinhala Sangam MN", "Skia", "Snell Roundhand", "Songti SC", "Songti TC", "Source Code Pro for Powerline", "Space Mono", "Space Mono for Powerline", "STFangsong", "STHeiti", "STIX Two Math", "STIX Two Text", "STKaiti", "STSong", "Sukhumvit Set", "Symbol", "Symbol Neu for Powerline", "Tahoma", "Tamil MN", "Tamil Sangam MN", "Telugu MN", "Telugu Sangam MN", "Thonburi", "Times New Roman", "Tinos for Powerline", "Toppan Bunkyu Gothic", "Toppan Bunkyu Midashi Gothic", "Toppan Bunkyu Midashi Mincho", "Toppan Bunkyu Mincho", "Trattatello", "Trebuchet MS", "Tsukushi A Round Gothic", "Tsukushi B Round Gothic", "Ubuntu Mono derivative Powerline", "Verdana", "Waseem", "Wawati SC", "Wawati TC", "Webdings", "Weibei SC", "Weibei TC", "Wingdings", "Wingdings 2", "Wingdings 3", "Xingkai SC", "Xingkai TC", "Yuanti SC", "Yuanti TC", "YuGothic", "YuKyokasho", "YuKyokasho Yoko", "YuMincho", "YuMincho +36p Kana", "Yuppy SC", "Yuppy TC", "Zapf Dingbats", "Zapfino"]

root = Tk()
root.geometry("400x200")

i = 0

l = Label(root, text="Text Will Appear Here", pady=20)
l.pack()

def forward():
    global i
    if i < len(list_of_fonts):
        i += 1
        l["text"] = list_of_fonts[i]
        l["font"] = (list_of_fonts[i], 24)
        l.pack()
    
    else:
        l["text"] = "OUT OF RANGE"

def backward():
    global i

    if i >= 0:
        i -= 1
        l["text"] = list_of_fonts[i]
        l["font"] = (list_of_fonts[i], 24)
        l.pack()

    else:
        l["text"] = "OUT OF RANGE"       

forward_button = Button(root, text = ">", command=forward)
backward_button = Button(root, text = "<", command=backward)

forward_button.place(x=200, y=100)
backward_button.place(x=160, y=100)



root.mainloop()